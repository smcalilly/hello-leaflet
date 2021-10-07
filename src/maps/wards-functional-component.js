import React, { useEffect, useState } from 'react'
import BaseMap from './base'
import { GeoJSON } from 'react-leaflet'

function ChicagoWardMap({ selectWard }) {
  const [wardBorders, setWardBorders] = useState(null)

  useEffect(() => {
    // get the geojson
    fetch('https://raw.githubusercontent.com/datamade/chicago-judicial-elections/master/wards/wards_2012.geojson')
      .then((res) => res.json()) // parse the response into json
      .then((geojson) => {
          setWardBorders(geojson) // with the geojson, set the state for wardBorders
      })

  }, [setWardBorders])

  const fill = {
    fillColor: '#daf0ce', 
    weight: 0.5,
    opacity: 0.4,
    color: '#666',
    fillOpacity: 0.5
  }

  function onWardClick(e) {
    const layer = e.target

    const layerFeature = (layer?.feature?.properties) 
                          ? layer.feature.properties 
                          : null
    
    selectWard(layerFeature)
  }

  function eventHandlersOnEachFeature(feature, layer) {
    layer.on({
      click: onWardClick
    })
  }

  return (
    <>
      <BaseMap center={[41.8781, -87.6298]} zoom={10}>
      {/* this will only show when wardBorders has a value */}
      {wardBorders && <GeoJSON
                        key='ward-layer'
                        data={wardBorders}
                        style={fill} 
                        onEachFeature={eventHandlersOnEachFeature} />}
      </BaseMap>
    </>
  )
}

export default ChicagoWardMap
