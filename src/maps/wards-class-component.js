import React, { useEffect, useState } from 'react'
import BaseMap from './base'
import { GeoJSON } from 'react-leaflet'

class ChicagoWardMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      wardBorders: null
    }

    this.onWardClick = this.onWardClick.bind(this) 
    this.eventHandlersOnEachFeature = this.eventHandlersOnEachFeature.bind(this)
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/datamade/chicago-judicial-elections/master/wards/wards_2012.geojson')
      .then((res) => res.json()) // parse the response into json
      .then((geojson) => {
          // with the geojson, set the state for wardBorders
          this.setState({
            wardBorders: geojson
          })
      })
  }

  onWardClick(e) {
    const layer = e.target
    const layerFeature = (layer?.feature?.properties) 
                          ? layer.feature.properties 
                          : null
    this.props.selectWard(layerFeature)
  }

  eventHandlersOnEachFeature(feature, layer) {
    layer.on({
      click: this.onWardClick
    })
  }

  fill = {
    fillColor: '#daf0ce', 
    weight: 0.5,
    opacity: 0.4,
    color: '#666',
    fillOpacity: 0.5
  }

  render() {
    return (
      <>
        <BaseMap center={[41.8781, -87.6298]} zoom={10}>
          {this.state.wardBorders && <GeoJSON
                                      key='ward-layer'
                                      data={this.state.wardBorders}
                                      style={this.fill} 
                                      onEachFeature={this.eventHandlersOnEachFeature} />}
        </BaseMap>
      </>
    )
  }
}

export default ChicagoWardMap
