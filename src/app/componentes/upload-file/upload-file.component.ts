import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface FileConfig {
  validExtensions: string[];
  validSize: number;
  maximumQuantity: number;
}

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true,
    }
  ],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent implements OnInit, ControlValueAccessor{
  @Input() idInput: string = 'default';
  @Input() name: string = 'default';
  @Input() Etiqueta: string = 'NA';

  @Input() acceptedExtensions: string[] = ['pdf'];
  @Output() filesSelected = new EventEmitter<{ id: string, files: File[] }>(); // Cambiar 'string[]' a 'File[]'

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('fileNameDisplay') fileNameDisplay!: ElementRef;
  @ViewChild('uploadButton') uploadButton!: ElementRef;
  @ViewChild('attachedFilesContainer') attachedFilesContainer!: ElementRef;

  configFileInputs: { [key: string]: FileConfig } = {};
  selectedFiles: { [key: string]: File[] } = {};
  attachmentList: { [key: string]: File[] } = {};
  isUploading: boolean = false;
  errorMessage: string | null = null;

  onChange = (files: File[]) => {};
  onTouched = () => {};
  isDisabled = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.selectedFiles[this.idInput] = [];
    this.attachmentList[this.idInput] = [];
    // Usar las extensiones pasadas desde el padre
    this.setValidationParameters(this.idInput, this.acceptedExtensions, 5000000, 4);
  }

  setValidationParameters(idElement: string, extensions: string[], size: number, quantity: number) {
    this.configFileInputs[idElement] = {
      validExtensions: extensions.map(e => e.toLowerCase()),
      validSize: size,
      maximumQuantity: quantity
    };
  }

  writeValue(files: File[] | null): void {
    this.selectedFiles[this.idInput] = files || [];
    this.updateFileNameDisplay(this.idInput);
  }

  registerOnChange(fn: (files: File[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  selectingFiles(event: Event) {
    const input = event.target as HTMLInputElement;
    const idInput = input.id;
    const files = input.files;

    this.errorMessage = null; // Limpiar mensajes de error previos

    if (files && files.length > 0) {
      const selectedFile = files[0]; // Solo tomamos el primer archivo

      const config = this.configFileInputs[idInput];
      const extension = selectedFile.name.split('.').pop()?.toLowerCase();

      if (!config.validExtensions.includes(extension || '')) {
        this.errorMessage = `El tipo de archivo no es válido. Tipos permitidos: ${config.validExtensions.join(', ')}`;
        return;
      }
      if (selectedFile.size > config.validSize) {
        this.errorMessage = `El archivo es demasiado grande. Máximo permitido: ${config.validSize / 1000000} MB`;
        return;
      }

      // Guardamos el archivo en la variable local
      this.selectedFiles[idInput] = [selectedFile];

      this.updateFileNameDisplay(idInput);
      this.enableUploadButton(idInput);
    }
  }




  updateFileNameDisplay(idInput: string) {
    if (this.fileNameDisplay) {
      this.fileNameDisplay.nativeElement.textContent = this.selectedFiles[idInput]?.length > 0
        ? this.selectedFiles[idInput].map(file => file.name).join(', ')
        : 'Sin archivo seleccionado';
    }
  }

  enableUploadButton(idInput: string) {
    if (this.uploadButton) {
      this.uploadButton.nativeElement.disabled = !(this.selectedFiles[idInput]?.length > 0);
    }
  }

  async uploadFiles() {
    if (this.selectedFiles[this.idInput]?.length > 0) {
      try {
        this.isUploading = true;
        if (this.uploadButton) {
          this.uploadButton.nativeElement.classList.add('visually-hidden');
        }

        // Simulación de subida de archivos
        await this.uploadFile(this.selectedFiles[this.idInput]);

        if (this.uploadButton) {
          this.uploadButton.nativeElement.classList.remove('visually-hidden');
          this.isUploading = false;
        }

        // Guardar el archivo en la lista adjunta
        this.attachmentList[this.idInput] = [...this.selectedFiles[this.idInput]];
        this.updateAttachedFilesList();

        // **Emitir el archivo al componente padre aquí**
        this.filesSelected.emit({ id: this.idInput, files: this.selectedFiles[this.idInput] });

        // **Resetear el input file**
        this.selectedFiles[this.idInput] = [];
        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
        this.updateFileNameDisplay(this.idInput);

        this.cdr.detectChanges();
      } catch (error) {
        console.error('Error al cargar archivos:', error);
      } finally {
        this.isUploading = false;
      }
    } else {
      console.error('No hay archivos seleccionados.');
    }
  }

  async uploadFile(files: File[]): Promise<File[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (files.length > 0) {
          resolve(files);
        } else {
          reject('No se seleccionaron archivos.');
        }
      }, 0);
    });
  }

  updateAttachedFilesList() {
    if (this.attachedFilesContainer) {
      const container = this.attachedFilesContainer.nativeElement;
      this.attachmentList[this.idInput]?.forEach(file => {
        const fileElement = document.createElement('div');
        container.appendChild(fileElement);
      });
    }
  }

  clearFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    this.selectedFiles[this.idInput] = [];
    this.updateFileNameDisplay(this.idInput);
    this.enableUploadButton(this.idInput);
  }

  removeFile(idInput: string, fileToRemove: File) {
    console.log(idInput)
    // Eliminar el archivo de las listas locales
    this.attachmentList[idInput] = this.attachmentList[idInput]?.filter(file => file !== fileToRemove) || [];
    this.selectedFiles[idInput] = this.selectedFiles[idInput]?.filter(file => file !== fileToRemove) || [];

    // Emitir la lista actualizada con archivos originales
    this.filesSelected.emit({ id: this.idInput, files: this.selectedFiles[this.idInput] });

    // Actualizar la UI
    this.updateAttachedFilesList();
    this.updateFileNameDisplay(idInput);
    this.enableUploadButton(idInput);
    this.cdr.detectChanges();
  }
}
