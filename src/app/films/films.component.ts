import { Component, OnInit } from '@angular/core';
import { FilmService } from '../_services/film.service';
import { Film } from '../models/Film';
import { AlertifyService } from '../_services/alertify.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films = new Array<Film>();
  filmToAdd = new Film();
  editMode: boolean;
  url: any = '../assets/images/no-image.jpg';

  constructor(private filmService: FilmService, private alertify: AlertifyService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.getFilms();
  }

  getFilms() {
    this.filmService.getFilms().subscribe(response => {
      this.films = response;
    }, error => {
      this.alertify.error('Unable to get films - some errors occured');
    });
  }

  addFilm() {
    if (this.checkValidation()) {} else {
    this.filmToAdd.imageBase64 = this.url;
    this.filmService.addFilm(this.filmToAdd).subscribe(() => {
      this.alertify.success('Film added to databse');
      this.resetAndReload();
    }, error => {
      this.alertify.error('Can not add film');
    });
  }
  }

  prepareEdit(filmId: any, filmTitle: any, filmCategory: any, filmLength: any, filmRating: any, filmDescription: any, filmImage: any) {
    this.editMode = true;
    this.filmToAdd.filmId = filmId;
    this.filmToAdd.title = filmTitle;
    this.filmToAdd.category = filmCategory;
    this.filmToAdd.length = filmLength;
    this.filmToAdd.rating = filmRating;
    this.filmToAdd.description = filmDescription;
    this.url = 'data:image/png;base64,' + filmImage;
  }

  edit() {
    if (confirm('Are you sure to edit ' + this.filmToAdd.title)) {
    this.filmService.editFilm(this.filmToAdd).subscribe(() => {
      this.alertify.success('Film edited');
      this.resetAndReload();
    }, error => {
      this.alertify.error('Can not edit film');
    });
  }
  }

  delete(filmId: any, filmTitle: string) {
    if (confirm('Are you sure to delete ' + filmTitle)) {
    this.filmService.deleteFilm(filmId).subscribe(() => {
      this.alertify.success('Film deleted');
      this.resetAndReload();
    }, error => {
      this.alertify.error('Can not delete film');
    });
  }
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (loaded: any) => {
        this.url = loaded.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  resetAndReload() {
      this.filmToAdd = new Film();
      this.url = '../assets/images/no-image.jpg';
      this.getFilms();
      this.editMode = false;
  }

  checkValidation() {
    if (
    this.filmToAdd.title === undefined &&
    this.filmToAdd.category === undefined &&
    this.filmToAdd.length === undefined &&
    this.filmToAdd.rating === undefined &&
    this.filmToAdd.description === undefined &&
    this.url === '../assets/images/no-image.jpg'
    ) {return true; }
    return false;
  }
}
