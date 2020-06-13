Here is an example of using the three.js library to load and render 3D models, in this case, files with .gltf extension.

The component receives three parameters in props

<GLTFComponent
  url={url} //URL from 3D model. In this case i've stored in amazon s3
  clientWidth="400" //Canvas width
  clientHeight="350"> //Canvas height
</GLTFComponent>
