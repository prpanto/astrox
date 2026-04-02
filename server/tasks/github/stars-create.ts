export default defineTask({
  meta: {
    name: "github:stars-create",
    description: "Run task to insert the stars from github",
  },
  run({ name, payload, context }) {

    return {
      result: ""
    };
  },
});