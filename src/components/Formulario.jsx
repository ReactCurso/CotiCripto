import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomonedas";
import axios from "axios";
import Error from "./Error";
const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #55a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({setMoneda, setCripto}) => {
  const [listCripto, setListCripto] = useState([]);
  const [error, setError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar Americano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra esterlina" }
  ];
  const [moneda, SelectMonedas] = useMoneda("Seleccionar moneda:", "", MONEDAS);
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Seleccionar criptomoneda",
    "",
    listCripto
  );

  useEffect(() => {
    const getApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      setListCripto(resultado.data.Data);
    };
    getApi();
  }, []);

  const cotizarMoneda = e => {
    e.preventDefault();

    if (moneda === "" || criptomoneda === "") {
      setError(true);
      return;
    }
    setError(false);
    setMoneda(moneda);
    setCripto(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="error" /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="calcular" />
    </form>
  );
};

export default Formulario;
