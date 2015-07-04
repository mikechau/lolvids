Feature: Videos

  Scenario: Video autoplays
    Given I am a user
    When I go to the base url
    Then I see a video
    And the video has a source
    And I see the "video counter start" is 1
    And I see the "video-counter-end" is not 0
    And I see the "video title" is not "Loading..."
    And I see the "video id" is not "..."
    And I see the "video timestamp" is not empty

  Scenario: Swiping between videos
    Given I am a user
    When I go to the base url
    Then I see a video
    And I see the "video counter start" is 1
    When I press the "right" arrow key
    Then I see the "video counter start" is 2
    When I press the "left" arrow key
    Then I see the "video counter start" is 1
    When I press the "left" arrow key
    Then I see I am on the last video
    When I press the "right" arrow key
    Then I see the "video counter start" is 1
    When I click the "next" video action
    Then I see the "video counter start" is 2
    When I click the "previous" video action
    Then I see the "video counter start" is 1
    When I click the "previous" video action
    Then I see I am on the last video
    When I click the "next" video action
    Then I see the "video counter start" is 1

  Scenario: Resizing video
    Given I am a user
    When I go to the base url
    Then I see a video
    When I resize the window to "x" by "y"
    Then I see the video has resized to "x" by "y"
    When I resize the window to "x" by "y"
    Then I see the video has resized to "x" by "y"

  Scenario: Pausing a video
    Given I am a user
    When I go to the base url
    And I see a video
    And I press the "spacebar" key
    Then the video is paused
