import React, { useEffect } from "react";
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Br, Cut, Line, Printer, render, Row, Text } from 'react-thermal-printer';
import ThermalPrinter from 'thermal-printer';
export default function ThermalPrint() {
    const print = () =>{
        console.log(ThermalPrinter)
    }
  const receipt = (
    <Printer type="epson" width={42} characterSet="india" debug={true}>
      <Text size={{ width: 2, height: 2 }}>9dfg</Text>
      <Text bold={true}>sdg</Text>
      <Br />
      <Line />
      <Row left="dfg" right="dfg" />
      <Row left="dfg" right="dfg" />
      <Row left="dfg" right="dg" />
      <Row left="dfg" right="dfg" />
      <Row left="dfg" right="863" />
      <Row left="dfg" right="dfg" />
      <Line />
      <Row left={<Text bold={true}>dfg</Text>} right="11,000" />
      <Text>dfg"</Text>
      <Row left="dfg" right="- 500" />
      <Br />
      <Line />
      <Row left={<Text bold={true}>dfg</Text>} right="9,500" />
      <Row left="dg" right="- 1,000" />
      <Line />
      <Row left="dfg" right="dfg" />
      <Row left="dfg" right="000-00-00000" />
      <Row left="dg" right="0000-0000" />
      <Row left="dfg" right="dfgdfg" />
      <Line />
      <Br />
      <Text align="center">Wifi: some-wifi / PW: 123123</Text>
      <Cut />
    </Printer>
  );
  const data= render(receipt);
  const [port, setPort] = useState();
//   const { mutateAsync: print, isLoading: isPrinting } = useMutation(async () => {
//     let _port = port;
//     if (_port == null) {
//       _port = await navigator.serial.requestPort();
//       await _port.open({ baudRate: 9600 });
//       setPort(_port);
//     }

//     const writer = _port.writable?.getWriter();
//     if (writer != null) {
//       const data = await render(receipt);

//       await writer.write(data);
//       writer.releaseLock();
//     }
//   });

  return (
    <main>
      <div>{receipt}</div>
      <div style={{ marginTop: 24 }}>
        <button  onClick={() => print()}>
         Print
        </button>
      </div>
    </main>
  );
}