package br.com.fiap.atvFase7.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "T_FINTECH_INVESTIMENTO")
public class Investimento {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "SEQ_T_FINTECH_INVESTIMENTO"
    )

    @SequenceGenerator(
            name = "SEQ_T_FINTECH_INVESTIMENTO",
            sequenceName = "SEQ_T_FINTECH_INVESTIMENTO",
            allocationSize = 1
    )

    @Column(name = "ID_INVESTIMENTO")
    private Long id;

    @Column(name = "ID_USUARIO")
    private Long idUsuario;

    @Column(name = "DS_INVESTIMENTO")
    private String descricaoInvestimento;

    @Column(name = "VL_INVESTIMENTO")
    private double valorInvestimento;

    @Column(name = "DT_APLICACAO")
    private LocalDate dtInvestimento;

    // GETTERS E SETTERS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getDescricaoInvestimento() {
        return descricaoInvestimento;
    }

    public void setDescricaoInvestimento(String descricaoInvestimento) {
        this.descricaoInvestimento = descricaoInvestimento;
    }

    public double getValorInvestimento() {
        return valorInvestimento;
    }

    public void setValorInvestimento(double valorInvestimento) {
        this.valorInvestimento = valorInvestimento;
    }

    public LocalDate getDtInvestimento() {
        return dtInvestimento;
    }

    public void setDtInvestimento(LocalDate dtInvestimento) {
        this.dtInvestimento = dtInvestimento;
    }
}
