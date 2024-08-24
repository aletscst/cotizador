import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropzone-image',
  standalone: true,
  imports: [],
  templateUrl: './dropzone-image.component.html',
  styleUrl: './dropzone-image.component.scss'
})
export class DropzoneImageComponent {
  @Output() onFileSelected = new EventEmitter<File>();
  public imgTemp: any;

  handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgTemp = e.target?.result;
    };
    reader.readAsDataURL(file);

    this.onFileSelected.emit(file);
  }

  onPaste(event: ClipboardEvent) {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            this.handleFile(file);
          }
        }
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = event.currentTarget as HTMLElement;
    dropzone.classList.add('dragover');
  }
  
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files || []);
    files.forEach(file => this.handleFile(file));
  }

}
