import { Link, BlitzPage, useMutation } from "blitz"
import Layout from "app/layouts/Layout"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Suspense } from "react"
import tw, { styled } from "twin.macro"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Text = tw.p`text-xl text-center my-4`

const Pre = tw.pre`bg-gray-100 rounded p-3 text-center my-3`

const Button = styled.button(({ small }) => [
  small && tw`px-2 py-4`,
  tw`text-base bg-purple-800 text-gray-200 text-center`,
])

const LinkButton = styled.a(({ outline, small }) => [
  small ? tw`px-4 py-2` : tw`px-8 py-4`,
  tw`text-center underline`,
  outline
    ? tw`text-purple-800 border-2 border-purple-800 hover:text-purple-900 hover:border-purple-900`
    : tw`text-base bg-purple-800 text-gray-200 hover:bg-purple-900`,
])

const Code = tw.code`text-lg`

const Buttons = tw.div`grid grid-flow-col gap-2`

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          tw="px-2 py-4"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <div>
          User id: <Code>{currentUser.id}</Code>
          <br />
          User role: <Code>{currentUser.role}</Code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <LinkButton small>
            <strong>Sign Up</strong>
          </LinkButton>
        </Link>
        <Link href="/login">
          <LinkButton small>
            <strong>Login</strong>
          </LinkButton>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div tw="min-h-screen flex flex-col justify-center items-center">
      <main tw="flex flex-1 flex-col justify-center items-center py-20">
        <div tw="mb-8">
          <img tw="w-72" src="/logo.png" alt="blitz.js" />
        </div>
        <Text>
          <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
        </Text>
        <Buttons tw="my-4">
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </Buttons>
        <Text>
          <strong>
            To add a new model to your app, <br />
            run the following in your terminal:
          </strong>
        </Text>
        <Pre>
          <Code>blitz generate all project name:string</Code>
        </Pre>
        <Pre>
          <Code>blitz db migrate</Code>
        </Pre>
        <div>
          <Text>
            Then <strong>restart the server</strong>
          </Text>
          <Pre>
            <Code>Ctrl + c</Code>
          </Pre>
          <Pre>
            <Code>blitz start</Code>
          </Pre>
          <Text>
            and go to{" "}
            <Link href="/projects">
              <a>/projects</a>
            </Link>
          </Text>
        </div>
        <Buttons tw="mt-20">
          <LinkButton
            outline={false}
            href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </LinkButton>
          <LinkButton
            outline
            href="https://github.com/blitz-js/blitz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Repo
          </LinkButton>
          <LinkButton
            outline
            href="https://slack.blitzjs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Slack Community
          </LinkButton>
        </Buttons>
      </main>

      <footer tw="w-full h-16 flex justify-center items-center bg-purple-900 border-t-2 border-solid">
        <a
          tw="flex justify-center items-center text-gray-200 no-underline"
          href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Blitz.js
        </a>
      </footer>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
