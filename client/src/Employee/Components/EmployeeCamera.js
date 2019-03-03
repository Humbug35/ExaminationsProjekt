import React , { Component } from 'react';
import Quagga from 'quagga';

class EmployeeCamera extends Component {
    componentDidMount() {
        Quagga.init({
            inputStream : {
              name : "Live",
              type : "LiveStream",
              constraints: {
                  width: 570,
                  height: 340
              },
            },
            locate: true,
            decoder : {
              drawScanline: true,  
              readers : ["code_128_reader"]
            }
          }, (err) => {
              if (err) {
                  console.log(err);
                  return
              }
              Quagga.start();
          });
    }
   
    componentWillUnmount() {
        Quagga.stop()
    }

    scan = () => {
        Quagga.onDetected(result => {
            if(result) {
                if(this.props.outloadingPath === '/employee/outloading') {
                    this.props.scannedOutloading(result.codeResult.code)
                    return Quagga.offDetected()
                } else if(this.props.deliveryPath === '/employee/delivery') {
                    this.props.scannedDelivery(result.codeResult.code)
                    return Quagga.offDetected()
                }
            }
        })
    }
    render() {
        return (
            <div className="camera-container">
                <div id="interactive" className="viewport"/>
                <button onClick={() => this.scan()}>Skanna</button>
            </div>
        )
    }
}

export default EmployeeCamera;