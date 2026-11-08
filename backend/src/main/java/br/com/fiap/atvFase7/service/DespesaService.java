package br.com.fiap.atvFase7.service;

import br.com.fiap.atvFase7.model.Despesa;
import br.com.fiap.atvFase7.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {

    @Autowired
    private DespesaRepository despesaRepository;

    public Despesa salvar(Despesa despesa) {
        return despesaRepository.save(despesa);
    }

    public Despesa buscarPorId(Long id) {
        Optional<Despesa> despesaOpitional = despesaRepository.findById(id);
        if (despesaOpitional.isPresent()) {
            return despesaOpitional.get();
        } else {
            throw new RuntimeException("Despesa não encontrada!");
        }
    }

    public List<Despesa> buscarTodos() {
        return despesaRepository.findAll();
    }

    public void excluir (Long id) {
        Optional<Despesa> despesaOptional = despesaRepository.findById(id);
        if (despesaOptional.isPresent()) {
            despesaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Despesa não encontrada!");
        }
    }

    public Despesa atualizar (Long id, Despesa despesa) {
        Optional<Despesa> despesaAtual = despesaRepository.findById(id);
        if (despesaAtual.isPresent()) {
            return despesaRepository.save(despesa);
        } else {
            throw new RuntimeException("Despesa não encontrada!");
        }
    }
}
