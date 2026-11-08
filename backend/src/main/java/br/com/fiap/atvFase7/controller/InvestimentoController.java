package br.com.fiap.atvFase7.controller;

import br.com.fiap.atvFase7.model.Investimento;
import br.com.fiap.atvFase7.service.InvestimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investimentos")
public class InvestimentoController {

    @Autowired
    private InvestimentoService investimentoService;

    // Método para cadastrar um investimento
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Investimento salvar (@RequestBody Investimento investimento) {
        return investimentoService.salvar(investimento);
    }

    // Método para buscar investimento por ID
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Investimento buscarPorId(@PathVariable Long id) {
        return investimentoService.buscarPorId(id);
    }

    // Método para listar todos os investimentos
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List buscarTodos () {
        return investimentoService.buscarTodos();
    }

    // Método para excluir um investimento pelo ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir (@PathVariable Long id) {
        investimentoService.excluir(id);
    }

    // Método para atualizar um investimento pelo id
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Investimento atualizar (@PathVariable Long id, @RequestBody Investimento investimento) {
        return investimentoService.atualizar(id, investimento);
    }
}
