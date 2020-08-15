import { Component, OnInit } from '@angular/core';
import { HttpClientService } from './http/http-client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { VentaModel } from './models/ventaModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [ 'dni', 'precio'];
  formVenta: FormGroup;
  dataSource = new MatTableDataSource<VentaModel>([]);
  constructor(
    private httpClientService: HttpClientService,
    private fb: FormBuilder
  ){
    this.formVenta = this.fb.group({
      cuentaBancaria: ['', Validators.required],
      precio: [0, Validators.required]
    });
  }
  ngOnInit(): void {

  }

  ngGuardar(): void {
    if (this.formVenta.valid) {
      this.httpClientService.guardar(this.formVenta.value).subscribe(
        rs => {
          this.ngListar();
          alert(rs.mensaje);
        }
      );
    }
  }
  ngListar(): void{
    this.httpClientService.listar().subscribe(
      rs => {
        this.dataSource = new MatTableDataSource<VentaModel>(rs);
      }
    );
  }
}
