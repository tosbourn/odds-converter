Feature: The App Runs

  As a user
  I want to be able to see the app
  So that I can interact with it

  Scenario:
    Given I am a user
    When I navigate to "/"
    Then I should see the title "Free Odds Converter"
