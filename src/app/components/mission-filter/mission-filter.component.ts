import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-mission-filter',
  templateUrl: './mission-filter.component.html',
  styleUrls: ['./mission-filter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MissionFilterComponent implements OnInit {
  @Output() yearSelected = new EventEmitter<string>();
  
  yearControl = new FormControl('all');
  years: string[] = ['all'];
  
  ngOnInit(): void {
    // Generate years from 2006 (first SpaceX launch) to current year
    const currentYear = new Date().getFullYear();
    for (let year = 2006; year <= currentYear; year++) {
      this.years.push(year.toString());
    }
  }
  
  selectYear(year: string): void {
    this.yearControl.setValue(year);
    this.yearSelected.emit(year);
  }
}