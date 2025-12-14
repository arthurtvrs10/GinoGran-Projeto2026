
import Slider from "@/Components/Home/Slider";


export default function Home(){
  const MinhasFotos = [
    "https://placehold.co/600x400/orange/white",
    "https://placehold.co/600x400/purple/white",
    "https://placehold.co/600x400/blue/white"
  ]

  return(
    <div style={{padding: "50px"}}>
      <h1>Minha Galeria Incrivel</h1>
      <Slider images={MinhasFotos}/>
    </div>
  );
}