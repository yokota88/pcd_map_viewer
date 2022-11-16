import { Suspense } from 'react'
import { Points } from 'three';
/*
Summary：地図点群の要素作成
[In]points:点群データ
[Out]点群地図のReact要素
*/
export const  MapPoints = ({points}) => {
    if(points === null){
        points = new Points();
    }
    return (
        <Suspense fallback={null}>
          <primitive object={points} />
        </Suspense>
      )
}
