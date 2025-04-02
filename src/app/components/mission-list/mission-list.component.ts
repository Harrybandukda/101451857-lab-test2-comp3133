import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    RouterLink,
    MissionFilterComponent
  ]
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  loading = true;
  error = false;
  
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
    if (year === 'all') {
      this.filteredMissions = this.missions;
    } else {
      this.loading = true;
      this.spacexService.getMissionsByYear(year).subscribe({
        next: (data) => {
          this.filteredMissions = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error filtering missions:', err);
          this.error = true;
          this.loading = false;
        }
      });
    }
  }
}