import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

function ProfileSidebar(propriedades) {
  // console.log(propriedades)
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`} target="_blank">
          {propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`/users/${itemAtual}`}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'vinivilares';
  const [comunidades, setComunidades] = React.useState([{
    id: '23192738912739812312',
    title: 'Eu Odeio Acordar Cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }, {
    id: '2873891273981298312',
    title: 'Queria Sorvete Mas Era Feijão',
    image: 'https://scontent.fcgh4-1.fna.fbcdn.net/v/t1.6435-9/167215787_4114938901863525_9196317370430945342_n.png?_nc_cat=110&ccb=1-3&_nc_sid=730e14&_nc_eui2=AeHIA9ASpRd7ecoip8ciyht21KVSLnCPtlrUpVIucI-2Wuq9tyfrZAvGyvXmDelGo3hTP223jDkbPlVRmya-1i6f&_nc_ohc=r3YCuniUOswAX-Es7tX&_nc_ht=scontent.fcgh4-1.fna&oh=d86430bab14ad21d5919cc02e09da948&oe=60FB1E92'
  }, {
    id: '23124515611238312',
    title: 'Buddy Poke',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuusEVNegm_nddYnmqlFobFB5JG3ynZg-26-Mo9pxff0FES35JOu4TxbrQzFTrJQmPs2E&usqp=CAU'
  }, {
    id: '2312231456685238312',
    title: 'Eu Odeio Esperar Resposta no MSN',
    image: 'https://img10.orkut.br.com/community/9197344aa3f8d682ece581e1146bec4a.jpg'
  }]);
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'Ewerson2',
    'renelcm',
    'GuilhermeMontez'
  ]

  const [seguidores, setSeguidores] = React.useState([]);
  // 0 - Pegar o array de dados do Github
  React.useEffect(function () {
    fetch('https://api.github.com/users/vinivilares/followers').then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    }).then(function (respostaCompleta) {
      setSeguidores(respostaCompleta);
    })
  }, [])

  // 1 - Criar um box que vai ter um map, baseado nos itens do array que pegamos do Github

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>
              Bem vindo(a) {githubUser}
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }

              // comunidades.push('Alura Stars');
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?" name="title" aria-label="Qual vai ser o nome da sua comunidade?" type="text" />
              </div>
              <div>
                <input placeholder="Coloque uma URL para usarmos de capa" name="image" aria-label="Coloque uma URL para usarmos de capa" type="text" />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}