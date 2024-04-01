classdef Pulse < handle
% ...
end
properties
        Type
        Frequency
        Length
        Edge 
        Window
        Modulation
        LowPass
        HighPass
        Dispersion
    end

    properties (Constant)
        StartFrequency = 10;
        StopFrequency = 20;
    end
     methods
        function result = generatePulse(obj)
            
            type = obj.Type;
            frequency = obj.Frequency;
            signalLength = obj.Length;
            edge = obj.Edge;
            window = obj.Window;
            modulation = obj.Modulation;
            lowpass = obj.LowPass;
            highpass = obj.HighPass;
            dispersion = obj.Dispersion;
            
            startFrequency = obj.StartFrequency;
            stopFrequency = obj.StopFrequency;
            
            t = -signalLength/2:1/frequency:signalLength/2;
            sig = (signalLength/(8*edge))^2;
            
            switch type
               % The rest of the code is the same as the original
               % function in the PulseGenerator app.
               % ...
        end
    end