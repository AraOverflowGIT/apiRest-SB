package com.example.ApiRestSB.controladores;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.ApiRestSB.modelos.Pelicula;
import com.example.ApiRestSB.repositorios.PeliculaRepository;

@RestController
public class PeliculaController {
	
	PeliculaRepository repositorio;

	public PeliculaController(PeliculaRepository repositorio) {
		this.repositorio = repositorio;
	}
	
	@CrossOrigin("http://127.0.0.1:9001")
	@GetMapping("/api/peliculas")
	public List<Pelicula> obtenerPeliculas(){
		return repositorio.findAll();
	}
	
	@CrossOrigin("http://127.0.0.1:9001")
	@GetMapping("/api/pelicula/{id}")
	public ResponseEntity<Pelicula> obtenerPelicula(@PathVariable Long id) {
		Optional<Pelicula> opt = repositorio.findById(id);
		
		if (opt.isEmpty()) {
			return ResponseEntity.badRequest().build();
		}
		else {
			return ResponseEntity.ok(opt.get());
		}
	}
	
	@CrossOrigin("http://127.0.0.1:9001")
	@PostMapping("/api/peliculas")
	public ResponseEntity<Pelicula> guardarPelicula(@RequestBody Pelicula pelicula) {
		
		if (pelicula.getId()!=null) {
			return ResponseEntity.badRequest().build();
		}
		
		repositorio.save(pelicula);
		return ResponseEntity.ok(pelicula);
	}
	
	@CrossOrigin("http://127.0.0.1:9001")
	@PutMapping("/api/peliculas")
	public ResponseEntity<Pelicula> actulizarPelicula(@RequestBody Pelicula pelicula) {
		
		if (pelicula.getId()==null || !repositorio.existsById(pelicula.getId()))
		{
			return ResponseEntity.badRequest().build();
		}
		
		repositorio.save(pelicula);
		return ResponseEntity.ok(pelicula);
	}
	
	@CrossOrigin("http://127.0.0.1:9001")
	@DeleteMapping("/api/pelicula/{id}")
	public ResponseEntity<Pelicula> borrarPelicula(@PathVariable Long id) {
		
		if (id == null || !repositorio.existsById(id))
		{
			return ResponseEntity.badRequest().build();
		}
		
		repositorio.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	
	
	
}

