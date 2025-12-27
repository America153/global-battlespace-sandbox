import { useEffect, useRef } from 'react'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { world } from './sim/world'
import { start } from './sim/time'

export default function CesiumMap() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    start()

    const viewer = new Cesium.Viewer(ref.current!, {
      terrainProvider: Cesium.createWorldTerrain(),
      timeline: false,
      animation: false
    })

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    handler.setInputAction((click) => {
      const cart = viewer.scene.globe.pick(
        viewer.camera.getPickRay(click.position),
        viewer.scene
      )
      if (!cart) return

      const pos = Cesium.Cartographic.fromCartesian(cart)
      const lon = Cesium.Math.toDegrees(pos.longitude)
      const lat = Cesium.Math.toDegrees(pos.latitude)

      world.bases.push({
        id: Date.now(),
        owner: 'PLAYER',
        lat,
        lon
      })

      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lon, lat),
        label: {
          text: 'HQ',
          fillColor: Cesium.Color.CYAN
        }
      })
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    // simple enemy alert
    setInterval(() => {
      if (world.bordersCrossed) {
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(0, 0),
          label: {
            text: '⚠ ENEMY CONTACT',
            fillColor: Cesium.Color.RED
          }
        })
        world.bordersCrossed = false
      }
    }, 2000)
  }, [])

  return <div ref={ref} style={{ width: '100vw', height: '100vh' }} />
}
