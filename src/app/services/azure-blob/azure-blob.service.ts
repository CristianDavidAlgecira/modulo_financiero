import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';


import {SKIP_AUTH} from "../../context/context-tokens";
import {environment} from "../../../environments/environment";
import {AzureBlobResponse} from "../../models/azure-blob/sastoken-response.model";

@Injectable({
  providedIn: 'root'
})
export class AzureBlobService {
  private http = inject(HttpClient);
  private apiUrl = environment.api_blob_storage;
  private container_name = environment.storage_container;


  getSasToken(): Observable<AzureBlobResponse> {
    return of(({
      urlSasToken: 'https://ssidatalakeprodg2.blob.core.windows.net/sistemanacionalsupervision?sv=2024-08-04&se=2025-03-06T02%3A20%3A13Z&sr=c&sp=rcwdl&sig=2jDglS6GNIZWL405H1HpI6KmUij6rALLTcg6W25FXhE%3D',
      message: 'Container SAS Token obtenido correctamente',
      statusCode: 200
    } as AzureBlobResponse)); //comentar en deploy

    const params = new HttpParams().set('containerName', this.container_name);
    return this.http.get<AzureBlobResponse>(`${this.apiUrl}/api/transversal/getsastoken`, {params});
  }


  /**
   * Sube un archivo al contenedor de Azure Blob Storage
   * @param file Archivo a subir
   * @returns Promesa con la respuesta de la subida
   */
  uploadFile(file: File, path: string, urlSasToken: string): Promise<any> {

      const [baseUrl, sasToken] = urlSasToken.split('?');

      const blobUrl = `${baseUrl}/${path}?${sasToken}`;

      const headers = new HttpHeaders({
        'x-ms-blob-type': 'BlockBlob'
      });

      return this.http.put(blobUrl, file, { headers, context: new HttpContext().set(SKIP_AUTH, true) }).toPromise();
  }

}
