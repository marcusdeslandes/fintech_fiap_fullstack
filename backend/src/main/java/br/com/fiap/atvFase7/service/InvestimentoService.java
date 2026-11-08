package br.com.fiap.atvFase7.service;

import br.com.fiap.atvFase7.model.Investimento;
import br.com.fiap.atvFase7.repository.InvestimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvestimentoService {

    @Autowired
    private InvestimentoRepository investimentoRepository;

    public Investimento salvar (Investimento investimento) {
        return investimentoRepository.save(investimento);
    }

    public Investimento buscarPorId (Long id) {
        Optional<Investimento> investimentoOptional = investimentoRepository.findById(id);
        if(investimentoOptional.isPresent()) {
            return investimentoOptional.get();
        } else {
            throw new RuntimeException("Investimento não encontrado!");
        }
    }

    public List<Investimento> buscarTodos() {
        return investimentoRepository.findAll();
    }

    public void excluir(Long id) {
        Optional<Investimento> investimentoOptional = investimentoRepository.findById(id);
        if (investimentoOptional.isPresent()) {
            investimentoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Investimento não encontrado!");
        }
    }

    public Investimento atualizar (Long id, Investimento investimento) {
        Optional<Investimento> investimentoAtual = investimentoRepository.findById(id);
        if (investimentoAtual.isPresent()) {
            return investimentoRepository.save(investimento);
        } else {
            throw new RuntimeException("Investimento não encontrado!");
        }
    }
}
