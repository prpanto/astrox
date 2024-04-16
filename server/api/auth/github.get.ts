import { useSession } from 'h3'

export default oauth.githubEventHandler({
  async onSuccess(event, { user: githubUser, tokens }) {
    let user: any = null
    const github = await useSession(event, { password: 'de49f5b9ecea66733c529ee62f2f45bce96072bd66f79d5e98cc1370ebab1471' })
    await github.update(() => ({ user: githubUser, token: tokens.access_token }))    

    const existingUser = await usePrisma().user.findFirst({
      where: {
        githubId: githubUser.id
      }
    })

    if (!existingUser) {
      user = await usePrisma().user.create({
        data: {
          githubId: githubUser.id,
          name: githubUser.name,
          username: githubUser.login,
          email: githubUser.email,
          avatar: githubUser.avatar_url,
        }
      })
    }

    user = user ?? existingUser

    await setUserSession(event, { user })
    return sendRedirect(event, '/dashboard')
  }
})
