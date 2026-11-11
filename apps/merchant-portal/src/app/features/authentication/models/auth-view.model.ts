export interface OtpChallengeState {
  phoneNumber: string;
  challengeId: string | null;
  cooldownSeconds: number;
  attemptsLeft: number;
}
