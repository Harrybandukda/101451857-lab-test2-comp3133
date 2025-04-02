import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

import { SpacexService } from '../../services/spacex.service';
import { Mission } from '../../models/mission.model';
import { MissionFilterComponent } from '../mission-filter/mission-filter.component';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    RouterLink,
    MissionFilterComponent
  ],
  animations: [
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(15px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  loading = true;
  error = false;
  searchTerm = '';
  selectedYear = 'all';
  
  constructor(private spacexService: SpacexService) { }

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(): void {
    this.loading = true;
    this.spacexService.getAllMissions().subscribe({
      next: (data) => {
        this.missions = data;
        this.filteredMissions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching missions:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  onYearFilter(year: string): void {
    this.selectedYear = year;
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    // First apply year filter
    let result = this.missions;
    
    if (this.selectedYear !== 'all') {
      this.loading = true;
      this.spacexService.getMissionsByYear(this.selectedYear).subscribe({
        next: (data) => {
          result = data;
          // Then apply search filter on the year-filtered results
          this.applySearchFilter(result);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error filtering missions by year:', err);
          this.error = true;
          this.loading = false;
        }
      });
    } else {
      // If no year filter, just apply search filter on all missions
      this.applySearchFilter(result);
    }
  }

  applySearchFilter(missions: Mission[]): void {
    if (!this.searchTerm.trim()) {
      this.filteredMissions = missions;
      return;
    }
    
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredMissions = missions.filter(mission => 
      mission.mission_name.toLowerCase().includes(term) || 
      mission.rocket.rocket_name.toLowerCase().includes(term)
    );
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedYear = 'all';
    this.filteredMissions = this.missions;
  }

  getMissionStatusClass(mission: Mission): string {
    return mission.launch_success ? 'status-successful' : 'status-failed';
  }
  
  getMissionStatusBadge(mission: Mission): string {
    return mission.launch_success ? 'badge-success' : 'badge-failed';
  }
}