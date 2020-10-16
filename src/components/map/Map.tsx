import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ lat, lng, text }) => <div>V</div>;


interface MyProps {
    center: object,
    zoom: number
}

interface MyState {
    value: string
}

class SimpleMap extends Component<MyProps, MyState> {
    static defaultProps = {
        center: {
            lat: 33.878030,
            lng: -84.504320
        },
        zoom: 11
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100%', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyApwGRfYpmOiQqNtmq8fvHH9zyj9G_t320' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={33.878030}
                        lng={-84.504320}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;