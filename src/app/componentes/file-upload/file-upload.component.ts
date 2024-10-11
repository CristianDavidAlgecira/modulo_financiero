import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  Input,
  SimpleChanges,
  ChangeDetectorRef, OnChanges,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimaryButtonComponent} from '../primary-button/primary-button.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [PrimaryButtonComponent, CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})

export class FileUploadComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() dataClass: any = [];
  @Input() mimes: string = '*';
  @Input() maxFiles: number = 0;
  @Input() error: boolean = false;
  @Input() fileValue: File[] = [];
  @Output() fileSelected = new EventEmitter<File[]>();
  @Output() uploadFile = new EventEmitter<File[]>();
  @ViewChild('fileInput') fileInput!: ElementRef;

  files: File[] = [];
  fileName: string = '';
  isFileUpdate: boolean | null = null;
  islimit: boolean | false = false;
  currentIndex = 0;
  maxVisibleFiles = 2;

  constructor(
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['error'] && changes['error'].currentValue) {
      this.cd.detectChanges();
      console.log(this.error);
    }

  }

  onFileSelected(event: any) {

    this.islimit = false;
    this.isFileUpdate = null;
    const selectedFiles = Array.from(event.target.files) as File[];

    if (this.files.length + selectedFiles.length > this.maxFiles && this.maxFiles !== 0) {
      this.islimit = true;
    } else {
      selectedFiles.forEach((file) => {
        if (!this.files.some(f => f.name === file.name && f.size === file.size)) {
          this.files.push(file);
        }
      });

      this.fileName = this.files.length > 0 ? this.files[0].name : '';
      this.islimit = false;
      this.fileSelected.emit(this.files);
    }

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }

    this.cd.detectChanges();

  }


  deleteFile(file: File) {

    this.files = this.files.filter(f => f !== file);
    this.fileName = this.files.length > 0 ? this.files[0].name : '';
    this.fileSelected.emit(this.files);
    this.uploadFile.emit(this.files);

    if (this.files.length === 0) {
      this.isFileUpdate = null;
    }

    if (this.currentIndex > this.files.length - this.maxVisibleFiles) {
      this.currentIndex = Math.max(0, this.files.length - this.maxVisibleFiles);
    }

  }

  triggerFileInput() {

    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }

  }

  onUpdateButton() {

    if (this.files.length === 0) {
      this.isFileUpdate = false;
    } else {
      this.uploadFile.emit(this.files);
      this.isFileUpdate = true;
    }

  }

  truncatedFileName(fileName: string, maxLength: number = 20): string {

    if (fileName.length <= maxLength) {
      return fileName;
    }
    const truncated = fileName.substring(0, maxLength - 3) + '...';
    return truncated;

  }

  get visibleFiles(): File[] {

    return this.files.slice(this.currentIndex, this.currentIndex + this.maxVisibleFiles);

  }

}
