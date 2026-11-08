package br.com.fiap.atvFase7.repository;

import br.com.fiap.atvFase7.model.Investimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestimentoRepository extends JpaRepository<Investimento, Long> {
}
