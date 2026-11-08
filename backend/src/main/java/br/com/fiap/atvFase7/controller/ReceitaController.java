package br.com.fiap.atvFase7.controller;

import br.com.fiap.atvFase7.model.Receita;
import br.com.fiap.atvFase7.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/receitas")
public class ReceitaController {

    @Autowired
    private ReceitaService receitaService;

    // Método para cadastrar uma receita
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Receita salvar(@RequestBody Receita receita) {
        return receitaService.salvar(receita);
    }

    // Método para buscar uma receita pelo ID
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Receita buscarPorId(@PathVariable Long id) {
        return receitaService.buscarPorId(id);
    }

    // Método para buscar uma lista com todas as receitas
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List buscarTodos() {
        return receitaService.buscarTodos();
    }

    // Método para deletar uma receita
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        receitaService.excluir(id);
    }

    // Método para atualizar uma receita
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Receita atualizar(@PathVariable Long id, @RequestBody Receita receita) {
        return receitaService.atualizar(id, receita);
    }

}
