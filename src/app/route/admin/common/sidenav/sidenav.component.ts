import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { BuildingService } from 'src/app/service/building.service';
import { SessionService } from 'src/app/service/authService/session.service';
import { Building } from 'src/app/model/building.model';
import { MatRadioChange } from '@angular/material/radio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy, OnInit {

  currentBuilding:          Building        = new Building();
  buildings:                Array<Building> = new Array();
  mobileQuery:              MediaQueryList;

  buildingReady:            boolean         = false;

  Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })

  private _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private buildingService:   BuildingService,
              private sessionService:    SessionService,
              media:                     MediaMatcher) {

    this.currentBuilding.name = "No Default Building";
    this.currentBuilding      = this.sessionService.loadCurrentBuilding();

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  loadBuilding(buildingId: number): void {
    this.buildingReady = false;
    this.buildingService
        .get(buildingId)
        .subscribe(b => {

          this.sessionService.setCurrentBuilding(b);
          this.currentBuilding = this.sessionService.loadCurrentBuilding();

          this.buildingReady = true;

          this.Toast.fire({
            icon: 'success',
            title: 'Building Selected: ' + this.currentBuilding.name
          });

        });


  }

  ngOnInit(): void {

    this.loadBuilding(this.sessionService.load().defaultBuilding);
  }

  hasMoreBuilding(): boolean {
    return this.sessionService
               .load()
               .buildings && this.sessionService
                                 .load()
                                 .buildings
                                 .length > 0 && this.sessionService
                                                    .load()
                                                    .buildings
                                                    .some(b => b.id !== this.currentBuilding.id);
  }

  buildingChange(event: MatRadioChange, building: Building): void {

    this.loadBuilding(building.id);

  }


}
