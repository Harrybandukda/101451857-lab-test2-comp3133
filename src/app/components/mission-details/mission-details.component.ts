import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { SpacexService } from '../../services/spacex.service';
import { Mission } from '../../models/mission.model';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class MissionDetailsComponent implements OnInit {
  mission: Mission | null = null;
  loading = true;
  error = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spacexService: SpacexService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const flightNumber = Number(params.get('id'));
      if (flightNumber) {
        this.loadMissionDetails(flightNumber);
      } else {
        this.router.navigate(['/missions']);
      }
    });
  }

  loadMissionDetails(flightNumber: number): void {
    this.loading = true;
    this.spacexService.getMissionByFlightNumber(flightNumber).subscribe({
      next: (data) => {
        this.mission = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching mission details:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/missions']);
  }
  
  openImage(imageUrl: string): void {
    this.dialog.open(ImageViewerComponent, {
      data: { imageUrl },
      maxWidth: '95vw',
      maxHeight: '95vh',
      panelClass: 'image-viewer-dialog'
    });
  }
}