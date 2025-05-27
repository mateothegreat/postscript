/**
 * Cypress component tests for the instance() method and Instance class.
 * These tests ensure that components are properly mounted and props are correctly passed.
 */

import Basic from "$test/components/basic.svelte";
import { Instance, instance } from "./instance";

describe("Instance", () => {
  const props = {
    testId: "instance-render"
  };

  let ref: Instance<typeof props>;

  it("should create an instance with component and props", () => {
    ref = instance({
      component: Basic,
      props
    });

    expect(ref.component).to.equal(Basic);
    expect(ref.props).to.deep.equal(props);

    ref.render(document.body);
    cy.get("[data-name='basic']").should("exist");
  });

  it("should destroy an instance", () => {
    ref.destroy();
    cy.get("[data-name='basic']").should("not.exist");
  });
});

// describe("Instance Class and instance() Method", () => {
//   beforeEach(() => {
//     // Create a clean test container for each test
//     cy.get("body").then(($body) => {
//       if ($body.find("#test-container").length === 0) {
//         cy.get("body").append('<div id="test-container"></div>');
//       }
//     });
//   });

//   afterEach(() => {
//     // Clean up after each test
//     cy.get("#test-container").then(($container) => {
//       $container.empty();
//     });
//   });

//   describe("Instance Class", () => {
//     it("should create an instance with component and props", () => {
//       const props = { message: "Test Message", count: 5 };
//       const componentInstance = new Instance(TestComponent, props);

//       expect(componentInstance.component).to.equal(TestComponent);
//       expect(componentInstance.props).to.deep.equal(props);
//     });

//     it("should render component with default props", () => {
//       const componentInstance = new Instance(TestComponent, {});

//       cy.get("#test-container").then(($container) => {
//         const mounted = componentInstance.render($container[0]);

//         // Verify the component is mounted
//         cy.get('[data-testid="test-component"]').should("exist");
//         cy.get('[data-testid="message"]').should("contain.text", "Hello World");
//         cy.get('[data-testid="count"]').should("contain.text", "Count: 0");

//         console.log(
//           inspect(
//             {
//               mounted,
//               message: "Component mounted successfully with default props"
//             },
//             { colorize: true, compact: false }
//           )
//         );
//       });
//     });

//     it("should render component with custom props", () => {
//       const customProps = {
//         message: "Custom Test Message",
//         count: 42,
//         testId: "custom-test-component"
//       };

//       const componentInstance = new Instance(TestComponent, customProps);

//       cy.get("#test-container").then(($container) => {
//         const mounted = componentInstance.render($container[0]);

//         // Verify the component is mounted with custom props
//         cy.get('[data-testid="custom-test-component"]').should("exist");
//         cy.get('[data-testid="message"]').should("contain.text", "Custom Test Message");
//         cy.get('[data-testid="count"]').should("contain.text", "Count: 42");

//         console.log(
//           inspect(
//             {
//               mounted,
//               customProps,
//               message: "Component mounted successfully with custom props"
//             },
//             { colorize: true, compact: false }
//           )
//         );
//       });
//     });

//     it("should handle component interactions after mounting", () => {
//       const componentInstance = new Instance(TestComponent, { count: 10 });

//       cy.get("#test-container").then(($container) => {
//         componentInstance.render($container[0]);

//         // Verify initial state
//         cy.get('[data-testid="count"]').should("contain.text", "Count: 10");

//         // Test interaction
//         cy.get('[data-testid="increment-btn"]').click();
//         cy.get('[data-testid="count"]').should("contain.text", "Count: 11");

//         // Test multiple interactions
//         cy.get('[data-testid="increment-btn"]').click().click();
//         cy.get('[data-testid="count"]').should("contain.text", "Count: 13");

//         console.log(
//           inspect(
//             {
//               message: "Component interactions working correctly after mounting"
//             },
//             { colorize: true, compact: false }
//           )
//         );
//       });
//     });
//   });

//   describe("instance() Factory Function", () => {
//     it("should create an Instance using the factory function", () => {
//       const config = {
//         component: TestComponent,
//         props: { message: "Factory Test", count: 99 }
//       };

//       const componentInstance = instance(config);

//       expect(componentInstance).to.be.instanceOf(Instance);
//       expect(componentInstance.component).to.equal(TestComponent);
//       expect(componentInstance.props).to.deep.equal(config.props);
//     });

//     it("should mount component created by factory function", () => {
//       const config = {
//         component: TestComponent,
//         props: {
//           message: "Factory Mount Test",
//           count: 777,
//           testId: "factory-test-component"
//         }
//       };

//       const componentInstance = instance(config);

//       cy.get("#test-container").then(($container) => {
//         const mounted = componentInstance.render($container[0]);

//         // Verify the component is mounted correctly
//         cy.get('[data-testid="factory-test-component"]').should("exist");
//         cy.get('[data-testid="message"]').should("contain.text", "Factory Mount Test");
//         cy.get('[data-testid="count"]').should("contain.text", "Count: 777");

//         console.log(
//           inspect(
//             {
//               mounted,
//               config,
//               message: "Factory function created and mounted component successfully"
//             },
//             { colorize: true, compact: false }
//           )
//         );
//       });
//     });

//     it("should handle empty props object", () => {
//       const config = {
//         component: TestComponent,
//         props: {}
//       };

//       const componentInstance = instance(config);

//       cy.get("#test-container").then(($container) => {
//         componentInstance.render($container[0]);

//         // Should use default props
//         cy.get('[data-testid="test-component"]').should("exist");
//         cy.get('[data-testid="message"]').should("contain.text", "Hello World");
//         cy.get('[data-testid="count"]').should("contain.text", "Count: 0");

//         console.log(
//           inspect({ message: "Factory function handles empty props correctly" }, { colorize: true, compact: false })
//         );
//       });
//     });
//   });

//   describe("Multiple Component Instances", () => {
//     it("should handle multiple component instances independently", () => {
//       const instance1 = instance({
//         component: TestComponent,
//         props: { message: "Instance 1", count: 1, testId: "instance-1" }
//       });

//       const instance2 = instance({
//         component: TestComponent,
//         props: { message: "Instance 2", count: 2, testId: "instance-2" }
//       });

//       cy.get("#test-container").then(($container) => {
//         // Mount both instances
//         instance1.render($container[0]);
//         instance2.render($container[0]);

//         // Verify both components exist independently
//         cy.get('[data-testid="instance-1"]').should("exist");
//         cy.get('[data-testid="instance-2"]').should("exist");

//         cy.get('[data-testid="instance-1"] [data-testid="message"]').should("contain.text", "Instance 1");
//         cy.get('[data-testid="instance-2"] [data-testid="message"]').should("contain.text", "Instance 2");

//         cy.get('[data-testid="instance-1"] [data-testid="count"]').should("contain.text", "Count: 1");
//         cy.get('[data-testid="instance-2"] [data-testid="count"]').should("contain.text", "Count: 2");

//         // Test that interactions are independent
//         cy.get('[data-testid="instance-1"] [data-testid="increment-btn"]').click();
//         cy.get('[data-testid="instance-1"] [data-testid="count"]').should("contain.text", "Count: 2");
//         cy.get('[data-testid="instance-2"] [data-testid="count"]').should("contain.text", "Count: 2"); // Should remain unchanged

//         console.log(
//           inspect({ message: "Multiple component instances work independently" }, { colorize: true, compact: false })
//         );
//       });
//     });
//   });

//   describe("Error Handling", () => {
//     it("should handle invalid target element gracefully", () => {
//       const componentInstance = instance({
//         component: TestComponent,
//         props: { message: "Error Test" }
//       });

//       // This should not throw an error but may not mount properly
//       expect(() => {
//         componentInstance.render(null as any);
//       }).to.not.throw();

//       console.log(inspect({ message: "Error handling test completed" }, { colorize: true, compact: false }));
//     });
//   });
// });
