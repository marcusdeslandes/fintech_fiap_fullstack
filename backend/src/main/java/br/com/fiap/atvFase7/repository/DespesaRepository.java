package br.com.fiap.atvFase7.repository;

import br.com.fiap.atvFase7.model.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DespesaRepository extends JpaRepository<Despesa, Long> {
}
