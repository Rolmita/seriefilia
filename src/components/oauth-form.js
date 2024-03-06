import { loginGoogle, loginGithub, loginDiscord, loginTwitch } from "@/lib/actions"

function OAuthForm() {

  return (
    <>
      <form className='oauth user-form'>
        <h3 style={{marginBottom: '1em'}}>Si lo prefieres, puedes: </h3>
        <fieldset>
          <div className="all"><button formAction={loginGoogle} className="social-button all">
            <img src="/google.svg" alt="Google" />  Iniciar sesión con Google
          </button>
          </div>
          <div>
            <button formAction={loginGithub} className="social-button all">
              <img src="/github.svg" alt="Github" /> Iniciar sesión con Github
            </button>
          </div>
          <div>
            <button formAction={loginTwitch} className="social-button all">
              <img src="/twitch.svg" alt="Twitch" style={{ width: '32px' }} /> Iniciar sesión con Twitch
            </button>
          </div>
          <div>
            <button formAction={loginDiscord} className="social-button all">
              <img src="/discord.svg" alt="Discord" style={{ width: '32px' }} /> Iniciar sesión con Discord
            </button>
          </div>
          </fieldset>
      </form>

    </>
  )
}

export default OAuthForm;