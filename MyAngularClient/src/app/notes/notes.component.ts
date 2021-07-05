import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { NotesService } from './notes.service';
import { Notes } from './notes';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'description', 'edit'];
  dataSource = new MatTableDataSource<any>();

  selectedNotes: Notes = new Notes();
  loading = false;

  constructor(public notesService: NotesService) {
  }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.loading = true;
    const data = await this.notesService.getNotes();
    this.dataSource.data = data;
    this.loading = false;
  }

  async updateNotes() {
    if (this.selectedNotes.id !== undefined) {
      await this.notesService.updateNotes(this.selectedNotes);
    } else {
      await this.notesService.createNotes(this.selectedNotes);
    }
    this.selectedNotes = new Notes();
    await this.refresh();
  }

  editNotes(notes: Notes) {
    this.selectedNotes = notes;
  }

  clearNotes() {
    this.selectedNotes = new Notes();
  }

  async deleteNotes(notes: Notes) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the note ${notes.name}. This cannot be undone.`)) {
      await this.notesService.deleteNotes(notes.id);
    }
    await this.refresh();
  }
}
