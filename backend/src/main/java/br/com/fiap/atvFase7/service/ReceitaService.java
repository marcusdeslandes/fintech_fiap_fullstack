package br.com.fiap.atvFase7.service;

import br.com.fiap.atvFase7.model.Receita;
import br.com.fiap.atvFase7.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;

    public Receita salvar (Receita receita) {
        return receitaRepository.save(receita);
    }

    public Receita buscarPorId(Long id) {
        Optional<Receita> receitaOptional = receitaRepository.findById(id);
        if (receitaOptional.isPresent()) {
            return receitaOptional.get();
        } else {
            throw new RuntimeException("Receita não encontrada!");
        }
    }

    public List<Receita> buscarTodos() {
        return receitaRepository.findAll();
    }

    public void excluir (Long id) {
        Optional<Receita> receitaOptional = receitaRepository.findById(id);
        if (receitaOptional.isPresent()) {
            receitaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Receita não encontrada!");
        }
    }

    public Receita atualizar(Long id, Receita receita) {
        Optional<Receita> receitaAtual = receitaRepository.findById(id);
        if (receitaAtual.isPresent()) {
            return receitaRepository.save(receita);
        } else {
            throw new RuntimeException("Receita não encontrada!");
        }
    }
}
