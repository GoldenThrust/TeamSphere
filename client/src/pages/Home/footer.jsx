import '../../styles/footer.css'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const developers = [{
    id: 0,
    name: "Adeniji Olajide",
    image: "https://avatars.githubusercontent.com/u/109282365?v=4",
    github: "https://github.com/GoldenThrust",
},
{
    id: 1,
    name: "Abeniezer Kifle",
    image: "https://avatars.githubusercontent.com/u/49494895?v=4.",
    github: "https://github.com/Ebenezerkifle",
},
{
    id: 2,
    name: "Stan Mosetf",
    image: "https://avatars.githubusercontent.com/u/119288936?v=4",
    github: "https://github.com/mosetf",
},
{
    id: 3,
    name: "Fabrice Uwayezu",
    image: "https://avatars.githubusercontent.com/u/125474498?v=4",
    github: "https://github.com/01Fab",
}]

const DevelopersComponent = () => {
  return (
    <>
      {developers.map(({ id, name, image, github }) => (
        <div key={id}>
          <Link to={github}>
            <Avatar src={image} alt={name}  sx={{ width: 100, height: 100 }} />
          </Link>
        </div>
      ))}
    </>
  );
};


export default function Footer() {
    return (
        <>
        <footer>
            <Typography variant='h3' sx={{ margin: "50px 0"}}>About TeamSphere</Typography>
            <Typography variant='body2' sx={{ fontSize: "25px", textAlign: "center"}}>TeamSphere is dedicated to revolutionizing team collaboration in virtual environments. Our mission is to empower teams worldwide to achieve more together, effortlessly and efficiently.</Typography>

            <Stack className='developers' direction="row" spacing={10}>
                <DevelopersComponent />
            </Stack>

            <Typography variant='body2' sx={{ fontSize: "25px", fontWeight: "bold", margin: "10ch"}}>
                © 2024 TeamSphere. All rights reserved.
            </Typography>
        </footer>
        </>
    )
}