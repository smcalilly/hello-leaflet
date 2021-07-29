import React, { useEffect, useState } from 'react'
import BaseMap from './base'
import { GeoJSON } from 'react-leaflet'

function ChicagoWardMap({ onSelectWard }) {
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

        const layerFeature = (layer && layer.feature && layer.feature.properties) 
                                ? layer.feature.properties 
                                : null
        
        onSelectWard(layerFeature)
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
            {ward && <p>Ward {ward.ward}'s shape_area = {ward.shape_area} and shape_leng = {ward.shape_leng}</p>}
        </>
    )
}

export default ChicagoWardMap
