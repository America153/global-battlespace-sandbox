import { useEffect, useRef } from 'react'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

export default function CesiumMap() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lon, lat),
        label: { text: 'HQ', font: '14px sans-serif' }
      })
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }, [])

  return <div ref={ref} style={{ width: '100vw', height: '100vh' }} />
}
