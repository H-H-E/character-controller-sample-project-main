export type SceneName = 
  | 'CityHub' 
  | 'InnovationLab' 
  | 'SocializationSphere' 
  | 'EducationalJourney' 
  | 'PromExperience' 
  | 'CommunityContributor';

export interface SceneProps {
  setCurrentScene: (sceneName: SceneName) => void;
} 