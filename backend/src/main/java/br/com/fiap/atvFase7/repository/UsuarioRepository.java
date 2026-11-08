package br.com.fiap.atvFase7.repository;

import br.com.fiap.atvFase7.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
