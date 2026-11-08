package br.com.fiap.atvFase7.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "T_FINTECH_DESPESA")
public class Despesa {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "SEQ_T_FINTECH_DESPESA"
    )

    @SequenceGenerator(
            name = "SEQ_T_FINTECH_DESPESA",
            sequenceName = "SEQ_T_FINTECH_DESPESA",
            allocationSize = 1
    )

    @Column(name = "ID_DESPESA")
    private Long id;

    @Column(name = "ID_USUARIO")
    private Long idUsuario;

    @Column(name = "DS_GASTO")
    private String descricaoDespesa;

    @Column(name = "VL_GASTO")
    private double valorDespesa;

    @Column(name = "DT_VENCIMENTO")
    private LocalDate dtVencimento;

    @Column(name = "ST_PAGO")
    private String situacaoPago;

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

    public void setIdUsuario(Long idDespesa) {
        this.idUsuario = idDespesa;
    }

    public String getDescricaoDespesa() {
        return descricaoDespesa;
    }

    public void setDescricaoDespesa(String descricaoDespesa) {
        this.descricaoDespesa = descricaoDespesa;
    }

    public double getValorDespesa() {
        return valorDespesa;
    }

    public void setValorDespesa(double valorDespesa) {
        this.valorDespesa = valorDespesa;
    }

    public LocalDate getDtVencimento() {
        return dtVencimento;
    }

    public void setDtVencimento(LocalDate dtVencimento) {
        this.dtVencimento = dtVencimento;
    }

    public String getSituacaoPago() {
        return situacaoPago;
    }

    public void setSituacaoPago(String situacaoPago) {
        this.situacaoPago = situacaoPago;
    }
}
