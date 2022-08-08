import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'input[sharedInput],select[sharedInput]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {}
