import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../spinner.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgIf],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private spinnerService: SpinnerService) {}
  ngOnInit(): void {
    this.spinnerService.isLoading$.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }
}
