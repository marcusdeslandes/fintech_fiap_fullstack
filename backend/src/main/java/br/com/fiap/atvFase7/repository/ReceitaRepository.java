package br.com.fiap.atvFase7.repository;

import br.com.fiap.atvFase7.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {
}
