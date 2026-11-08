package br.com.fiap.atvFase7.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "T_FINTECH_RECEITA")
public class Receita {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "SEQ_T_FINTECH_RECEITA"
    )

    @SequenceGenerator(
            name = "SEQ_T_FINTECH_RECEITA",
            sequenceName = "SEQ_T_FINTECH_RECEITA",
            allocationSize = 1
    )

    @Column(name = "ID_RECEITA")
    private Long id;

    @Column(name = "ID_USUARIO")
    private Long idUsuario;

    @Column(name = "DS_RECEITA")
    private String descricaoReceita;

    @Column(name = "VL_RECEITA")
    private double valorReceita;

    @Column(name = "DT_RECEBIMENTO")
    private LocalDate dtRecebimento;

    // GETTERS E SETTERS
    public Long getId() {
        return id;
    }

    public void setId(Long idReceita) {
        this.id = idReceita;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getDescricaoReceita() {
        return descricaoReceita;
    }

    public void setDescricaoReceita(String descricaoReceita) {
        this.descricaoReceita = descricaoReceita;
    }

    public double getValorReceita() {
        return valorReceita;
    }

    public void setValorReceita(double valorReceita) {
        this.valorReceita = valorReceita;
    }

    public LocalDate getDtRecebimento() {
        return dtRecebimento;
    }

    public void setDtRecebimento(LocalDate dtRecebimento) {
        this.dtRecebimento = dtRecebimento;
    }
}
