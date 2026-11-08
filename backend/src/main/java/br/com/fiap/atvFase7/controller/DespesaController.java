package br.com.fiap.atvFase7.controller;

import br.com.fiap.atvFase7.model.Despesa;
import br.com.fiap.atvFase7.service.DespesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/despesas")
public class DespesaController {

    @Autowired
    private DespesaService despesaService;

    // Método para cadastrar uma despesa
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Despesa salvar(@RequestBody Despesa despesa) {
        return despesaService.salvar(despesa);
    }

    // Método para buscar uma despesa pelo ID
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Despesa buscarPorId(@PathVariable Long id) {
        return despesaService.buscarPorId(id);
    }

    // Método para listar todas as despesas
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List buscarTodos() {
        return despesaService.buscarTodos();
    }

    // Método para excluir uma despesa pelo ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir (@PathVariable Long id) {
        despesaService.excluir(id);
    }

    // Método para atualizar uma despesa pelo ID
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Despesa atualizar (@PathVariable Long id, @RequestBody Despesa despesa) {
        return despesaService.atualizar(id, despesa);
    }
}
