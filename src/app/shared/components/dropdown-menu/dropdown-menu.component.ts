import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css'],
})
export class DropdownMenuComponent {
  @ViewChild('dropdown_container') drowdownContainer: ElementRef | undefined =
    undefined;
  @ViewChild('dropdown_button ') drowdownButton: ElementRef | undefined =
    undefined;
  @ViewChild('dropdown_menu ') drowdownMenu: ElementRef | undefined = undefined;

  @Input({ required: true }) id!: string;

  @Output('onDelete')
  eventDelete = new EventEmitter<string>();

  showing = false;

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.drowdownContainer!.nativeElement &&
        e.target !== this.drowdownButton!.nativeElement &&
        e.target !== this.drowdownMenu!.nativeElement
      ) {
        this.showing = false;
      }
    });
  }

  toogle() {
    this.showing = !this.showing;
  }

  delete() {
    this.eventDelete.emit(this.id);
  }
}
