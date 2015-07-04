Feature: Videos

  Scenario: Initial video
    Given I am a user
    When I go to the base url
    Then I see a video
    And the video has a source
    And I see the "video counter start" is 1
    And I see the "video-counter-end" is not 0
    And I see the "video title" is not "Loading..."
    And I see the "video id" is not "..."
    And I see the "video timestamp" is not empty

  Scenario: Swiping between videos (keyboard)
    Given I am a user
    When I go to the base url
    And I press the "right" arrow key
    Then I see the video counter at "2"
    When I press the "left" arrow key
    Then I see the video counter at "1"
    When I press the "left" arrow key
    Then I see I am on the last video
    When I press the "right" arrow key
    Then I see I am on the first video

  Scenario: Swiping between videos (mouse)
    Given I am a user
    When I go to the base url
    And I click the next video
    Then I see the video counter at "2"
    When I click the previous video
    Then I see the video counter at "1"
    When I click the previous video
    Then I see I am on the last video
    When I click the next video
    Then I see I am on the first video

  Scenario: Pausing video
    Given I am a user
    When I go to the base url
    And I press the spacebar key
    Then I see the video has paused
    When I press the spacebar key
    Then I see the video has unpaused

  Scenario: Autoplaying video
    Given I am a user
    When I go to the base url
    Then I see a video
    And I see the video counter at "1"
    And I see the video is playing
    When I wait for the video to finish
    Then I see the video counter at "2"
    And I see the video is playing
