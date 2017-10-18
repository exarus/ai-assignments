export default (environment, agent) => {
  let lastPercept = environment.percept
  return Object.freeze({
    environment,
    agent,
    performNextAction: () => {
      const action = agent.perceive(lastPercept)
      lastPercept = environment.acceptAction(action)
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Action: ${action}. Percept: ${JSON.stringify(lastPercept)}`)
      }
    }
  })
}
